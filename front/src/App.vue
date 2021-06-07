<template>
  <div class="todo">
    <h1>ToDo list</h1>
    <form class="todoInput">
      <input type="text" placeholder="print title" v-model="newToDo" />
      <button @click="addItem()"><b>+ Add</b></button>
    </form>
    <div class="todoList">
      <Item
        v-for="item of items"
        :key="item.id"
        :item="item"
        @del="delItem"
        @done="doneItem"
      />
    </div>
  </div>
</template>

<script>
import Item from "./components/Item.vue";
import { get, post, put, del } from "./requests";

export default {
  name: "App",
  components: { Item },
  data() {
    return {
      items: [],
      newToDo: "",
    };
  },
  async mounted() {
    try {
      this.items = await get("/api/todo");
    } catch (err) {
      console.log("GET ITEMS FAILURE ==> " + err);
    }
  },
  methods: {
    async addItem() {
      try {
        if (this.newToDo) {
          const newItem = Object.assign({ name: this.newToDo, done: 0 });
          await post("/api/todo", newItem);
        }
      } catch (err) {
        console.log("ADD ITEM FAILURE ==> " + err);
      }
    },
    async delItem(id) {
      try {
        const result = await del("/api/todo/" + id);
        if (result.status === "ok") {
          const idx = this.items.findIndex((el) => el.id === id);
          if (idx !== -1) {
            this.items.splice(idx, 1);
          }
        }
      } catch (err) {
        console.log("DEL ITEM FAILURE ==> " + err);
      }
    },
    async doneItem(id, done) {
      try {
        const result = await put("/api/todo/" + id, done);
        if (result.status === "ok") {
          this.items.forEach((el) => {
            if (el.id === id) el.done = done;
          });
        }
      } catch (err) {
        console.log("CHANGE ITEM FAILURE ==> " + err);
      }
    },
  },
};
</script>

<style lang="scss">
$mainColor: rgb(0, 172, 163);
body {
  background: radial-gradient(
      circle,
      rgba(rgb(255, 255, 255), 0.6) 0%,
      rgba(rgb(0, 63, 82), 0.7) 100%
    ),
    url("./assets/bg1.jpeg") center center / 18% repeat;
}
.todo {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  h1 {
    text-align: center;
  }
}
.todoInput {
  margin: 0 auto;
  height: 50px;
  width: 60%;
  margin-top: 30px;
  display: flex;
  input {
    width: 100%;
    border: 1px solid;
    border-right: none;
    padding: 0 10px;
    outline: none;
  }
  button {
    width: 100px;
    color: white;
    background-color: $mainColor;
    border: 1px solid black;
    outline: none;
    &:hover {
      background-color: white;
      color: $mainColor;
      cursor: pointer;
    }
  }
}
.todoList {
  margin: 0 auto;
  width: 60%;
  margin-top: 60px;
}
</style>
