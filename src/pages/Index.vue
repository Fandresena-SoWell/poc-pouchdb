<template>
  <q-page padding class="row items-center">
    <template v-if="todos.length === 0">
      <div class="col column q-px-md">
        <div class="q-mb-lg">
          <div class="text-h2 text-primary">Hey</div>
          <div class="text-h2">you are</div>
          <div class="text-h2">free today</div>
        </div>
        <p class="text-caption text-grey q-mb-xl">Time to get active</p>
        <q-btn
          outline
          rounded
          color="primary"
          size="lg"
          label="Add a new task"
          @click="openDialog"
        />
      </div>
    </template>
    <template v-else>
      <div class="col column q-px-md">
        <div class="q-mb-lg">
          <div class="text-h1 text-primary">{{ todos.length }}</div>
          <div class="text-h2">tasks</div>
          <div class="text-h2">for today</div>
        </div>
        <p class="text-caption text-grey q-mb-xl">
          {{ doneTodos.length }} tasks done
        </p>
        <q-btn
          outline
          rounded
          color="primary"
          size="lg"
          label="Add a new task"
          @click="openDialog"
        />
        <q-scroll-area class="q-mt-xl" style="height: 150px; width: auto">
          <template v-for="todo in todos" v-bind:key="todo.id">
            <poc-todo-item
              :todo="todo"
              @click="handleClicked"
              @delete="handleDeleted"
            ></poc-todo-item>
          </template>
        </q-scroll-area>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts" setup>
import PouchDB from 'pouchdb'
import { computed, onMounted } from 'vue'
import PocTodoItem from 'src/components/PocTodoItem.vue'
import { useQuasar } from 'quasar'
import { TodoRepositorySingletonFactory } from 'src/models/repositories/TodoRepository'
import { TodoItem } from 'src/models/entities'
import { ITodo } from 'src/models/interfaces'

const todoRepository = TodoRepositorySingletonFactory.Instance()

const todos = computed({
  get: () =>
    todoRepository.documents
      .value as unknown as PouchDB.Core.Document<TodoItem>[],
  set: () => {
    // NOTE: readonly
  },
})

const doneTodos = computed(() => todos.value.filter((t) => t.state === 'done'))

const $q = useQuasar()

const handleClicked = async ({ _id, state }: ITodo) => {
  await todoRepository.update(_id, { state })
}

const handleDeleted = async ({ _id }: ITodo) => {
  const todo = await todoRepository.findOne(_id)
  if (!todo) return
  if (todo.state === 'canceled') {
    await todoRepository.delete(_id)
  } else {
    await todoRepository.update(_id, { state: 'canceled' })
  }
}

const openDialog = () => {
  $q.dialog({
    title: 'Add a task',
    message: 'What do you want to be done today?',
    prompt: {
      model: '',
      type: 'text', // optional
    },
    cancel: true,
    persistent: true,
  })
    .onOk((label: string) => {
      const newTodo = new TodoItem(label)
      void todoRepository.create(newTodo)
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
}

onMounted(async () => {
  await todoRepository.find({})
})
</script>

<style lang="sass" scope>
.text-caption
  font-size: 1.5rem
  font-weight: 400
  line-height: 1.25rem
  letter-spacing: 0.03333em
</style>
