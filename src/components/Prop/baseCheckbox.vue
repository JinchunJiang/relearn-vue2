<template>
  <input
    type="checkbox"
    :checked="checked"
    @change="$emit('change', $event.target.checked)"
  />
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
};
</script>
