<template>
  <div class="sidebar">
    <ul>
      <li v-for="button in buttons" :key="button.text" @click="navigate(button.route)">
        {{ button.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { text: '页面1', route: '/table' },
        { text: '页面2', route: '/page2' },
        { text: '页面3', route: '/page3' },
      ],
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style>
.sidebar {
  width: 300px;
  opacity: 0.8;
  background-color: rgba(255,255,255,0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  cursor: pointer;
}
</style>
