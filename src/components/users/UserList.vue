<template>
  <BaseContainer>
    <h2>Active Users</h2>
    <BaseSearch
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    />
    <div>
      <button @click="sort('asc')" :class="{ selected: sorting === 'asc' }">
        Sort Ascending
      </button>
      <button @click="sort('desc')" :class="{ selected: sorting === 'desc' }">
        Sort Descending
      </button>
    </div>
    <ul>
      <UserItem
        v-for="user in displayedUsers"
        :key="user.id"
        :user-name="user.fullName"
        :id="user.id"
        @list-projects="handleList"
      />
    </ul>
  </BaseContainer>
</template>
  
<script setup>
import UserItem from "./UserItem.vue";
import BaseSearch from "../UI/BaseSearch.vue";
import BaseContainer from "../UI/BaseContainer.vue";

import { defineProps, defineEmits, computed, watch, ref } from "vue";

// use this code from utils func
import { getAvailableUsers } from '../../utils/selectedUtils';

const availableUsers = computed(() => {
  return getAvailableUsers(activeSearchTerm, props);
});


const props = defineProps(["users"]);
const emit = defineEmits(["list-projects"])

const enteredSearchTerm = ref("");
const activeSearchTerm = ref("");
const sorting = ref(null);

const handleList = (val) => {
    emit("list-projects", val)
}

// if use in component itself
// const availableUsers = computed(() => {
//   let users = [];
//   if (activeSearchTerm.value) {
//     users = props.users.filter((usr) =>
//       usr.fullName.includes(activeSearchTerm.value)
//     );
//   } else if (props.users) {
//     users = props.users;
//   }
//   return users;
// });

const displayedUsers = computed(() => {
  if (!sorting.value) {
    return availableUsers.value;
  }
  return availableUsers.value.slice().sort((u1, u2) => {
    if (sorting.value === "asc" && u1.fullName > u2.fullName) {
      return 1;
    } else if (sorting.value === "asc") {
      return -1;
    } else if (sorting.value === "desc" && u1.fullName > u2.fullName) {
      return -1;
    } else {
      return 1;
    }
  });
});

function updateSearch(val) {
  enteredSearchTerm.value = val;
}
function sort(mode) {
  sorting.value = mode;
}


watch(enteredSearchTerm, function (val) {
  setTimeout(() => {
    if (val === enteredSearchTerm.value) {
      activeSearchTerm.value = val;
    }
  }, 300);
});
</script>
  
<style scoped>
    ul {
    list-style: none;
    margin: 0;
    padding: 0;
    }
</style>