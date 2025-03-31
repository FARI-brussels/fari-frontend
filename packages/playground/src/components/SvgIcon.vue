<template>
  <div ref="svgContainer" class="inline-block"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  svg: {
    type: String,
    required: true,
  },
});

const stringToSvg = (svgString) => {

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  return doc.querySelector("svg") || null;
};

const svgContainer = ref(null);

const renderSvg = () => {
  if (svgContainer.value) {
    svgContainer.value.innerHTML = ""; 
    const svgElement = stringToSvg(props.svg);
    if (svgElement) {
      svgElement.setAttribute("width", "100%");
      svgElement.setAttribute("height", "100%");
      svgElement.setAttribute("stroke", "currentColor");
      svgContainer.value.appendChild(svgElement);
    }
  }
};

watch(() => props.svg, renderSvg);

onMounted(renderSvg);
</script>
