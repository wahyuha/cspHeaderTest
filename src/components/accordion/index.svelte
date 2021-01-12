<script>
  import { setContext } from "svelte";

  import { ACCORDION } from "@components/accordion/section.svelte";

  import { selected, setSelected, getSelected } from "@stores/accordion.js";

  const handleChange = function(newValue) {
    if (newValue === getSelected()) {
      newValue = null;
    }
    setSelected(newValue);
  };
  setContext(ACCORDION, {
    handleChange,
    selected,
  });
</script>

<slot />
