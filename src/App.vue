<template>
  <h3>Parent v-model value</h3>
  <pre>{{modeValue}}</pre>
  <test-form v-model="modeValue"></test-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import testForm from './shared/components/form/testForm.vue';

const modeValue = ref({
  name: '',
  testProp: ''
});
</script>
