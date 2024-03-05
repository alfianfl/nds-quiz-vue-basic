<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <BaseSearch
      v-if="hasProjects"
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    />
    <ul v-if="hasProjects">
      <ProjectItem
        v-for="prj in availableProjects"
        :key="prj.id"
        :title="prj.title"
      />
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>
  
  <script setup>
import ProjectItem from "./ProjectItem.vue";
import BaseContainer from "../UI/BaseContainer.vue";
import BaseSearch from "../UI/BaseSearch.vue";

import { defineProps, ref, computed, watch } from "vue";

import { getSelectedProject } from '../../utils/selectedUtils';

const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  },
});

const enteredSearchTerm = ref("");
const activeSearchTerm = ref("");

// onUpdated(() => {

//   props?.user?.projects?.forEach((element) => {
//       element.title = element.title.toLowerCase();
//       console.log("element.title", element.title);
//   });
// });

const hasProjects = computed(() => {
  return props.user.projects && availableProjects.value.length > 0;
});

const availableProjects = computed(() => {
    return getSelectedProject(activeSearchTerm, props)
})

// const availableProjects = computed(() => {
//   if (activeSearchTerm.value) {
//     return props.user.projects.filter((prj) =>
//       prj.title.includes(activeSearchTerm.value)
//     );
//   }
//   return props.user.projects;
// });

function updateSearch(val) {
  enteredSearchTerm.value = val;
}

watch(enteredSearchTerm, function (val) {
  setTimeout(() => {
    if (val === enteredSearchTerm.value) {
      activeSearchTerm.value = val;
    }
  }, 300);
});

watch(
  () => props.user,
  () => {
    enteredSearchTerm.value = "";
  }
);
</script>
  
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>