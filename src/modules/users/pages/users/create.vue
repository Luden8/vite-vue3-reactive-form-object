<route lang="yaml">
name: 'UsersCreate'
</route>

<script setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup';

import VInput from '@/shared/components/form/VInput.vue';
import VDatePicker from '@/shared/components/form/VDatePicker.vue';
import VQInput from '@/shared/components/form/VQInput.vue';
import VQDatePicker from '@/shared/components/form/VQDatePicker.vue';

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  name2: Yup.string(),
  name3: Yup.string(),
  date: Yup.string(),
  date2: Yup.string(),
  qname: Yup.string(),
  qname2: Yup.string(),
  qname3: Yup.string(),
  qdate: Yup.string(),
  qdate2: Yup.string()
});

function print(value) {
  console.log(value);
}
</script>

<template>
  <h1>UsersCreate</h1>
  <Form :validationSchema="validationSchema" v-slot="{ values, setFieldValue }">
    <div class="row">
      <pre class="col" @click="print(values)">{{ values }}</pre>
      <div class="col">
        <VInput name="name" label="名字" />
        <VInput
          name="name2"
          label="名字2"
          @update:modelValue="
            setFieldValue('name', $event ? $event + '%' : undefined)
          "
        />
        <VInput
          name="name3"
          label="名字3"
          @update:modelValue="setFieldValue('date', $event)"
        />
        <VDatePicker name="date" label="日期" />
        <VDatePicker
          name="date2"
          label="日期"
          @update:modelValue="setFieldValue('date', $event)"
        />
      </div>
      <div class="col">
        <VQInput name="qname" label="名字" />
        <VQInput
          name="qname2"
          label="名字2"
          @update:modelValue="
            setFieldValue('qname', $event ? $event + '%' : undefined)
          "
        />
        <VQInput
          name="qname3"
          label="名字3"
          @update:modelValue="setFieldValue('qdate', $event)"
        />
        <VQDatePicker name="qdate" label="日期" />
        <VQDatePicker
          name="qdate2"
          label="日期"
          @update:modelValue="setFieldValue('qdate', $event)"
        />
      </div>
    </div>
    <hr />
    <QBtn label="送出" color="primary" :to="{ name: 'UsersIndex' }" />
  </Form>
</template>
