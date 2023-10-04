<template>
  <q-checkbox dense keep-color color="blue" v-model="isChecked" :false-value="falseValue" :true-value="trueValue" @input="emitChange">{{ label }}</q-checkbox>
</template>

<script>
export default {
  name: 'CheckboxComponent',
  props: {
    label: String,
    value: Boolean,
    falseValue: String,
    trueValue: String
  },
  computed: {
    isChecked: {
      get() {
        return this.value;
      },
      set(newValue) {

        this.$emit('input', newValue);
      }
    }
  },
  methods: {
    emitChange() {

      this.$emit('input', this.isChecked);
    }
  }
};
</script>
