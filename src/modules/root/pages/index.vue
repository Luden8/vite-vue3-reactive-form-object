<route lang="yaml">
name: 'Home'
</route>

<script setup>
import TestForm from '@/shared/components/form/testForm.vue';
import { ref } from 'vue';
let testValue = ref({
  name: 'initial value',
  testProp: ''
});

const rewriteTest = value => {
  console.log(value);
  testValue.value = {
    name: value,
    testProp: value
  };
};
</script>

<template>
  <div class="q-mb-lg">
    <h5>Current v-model value outside:</h5>
    {{ testValue }}
    it is reactive as it shoud be
    <br />
    <br />
    <TestForm v-model="testValue" />
    <br />
    <br />
    <h5>We are able to reactivly change value inside the component:</h5>
    <button @click="rewriteTest('test')">Change value</button>
    <button @click="rewriteTest('check')">Check value</button>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto 1rem;
}
</style>
