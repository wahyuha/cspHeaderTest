<script>
	import Meta from "@components/meta/index.svelte";
import { lazy } from "@helpers/img.js";
import Accordion from "@components/accordion/index.svelte";
import Section from "@components/accordion/section.svelte";
import ButtonClose from "@components/button/close.svelte";
import FORGOT_CONSTANTS from "@constants/forgot";

let accordion = "";
</script>

<style>
	.direction-wrap {
		padding: 16px;
	}
	.info {
    margin: 0;
    padding: 24px 0 16px;
  }
  .icon-header {
    width: 24px;
    height: 24px;
    padding: 4px 16px 4px 0;
  }
  .content-slot {
    padding-top: 16px;
  }
  .d-flex-center {
    display: flex;
    align-items: center;
  }
  .item-flex {
    display: flex;
    padding: 4px 0 8px;
  }
  .item-num {
    padding: 4px 8px;
    background-color: #F1F2F6;
    color: #7E7E7E;
    border-radius: 10%;
    display: inline-table;
    margin-right: 16px;
    font-size: 12px;
  }
</style>

<Meta title="Lupa PIN" />
<div class="wrapper-clean">
	<div class="direction-wrap">
		<ButtonClose />
		<p class="info">
			Lupa PIN akun LinkAja kamu? Reset PIN kamu dengan metode yang tersedia, yuk!
    </p>
    <div>
      <Accordion>
        <Section key="1">
          <div class="d-flex-center" slot="header">
            <img
              class="icon-header"
              alt="Pertanyaan Keamanan"
              src="icons/question.png"
              use:lazy={{ src: "icons/question.png" }} />
            <span class="ff-b" bind:this={accordion}>
              Pertanyaan Keamanan
            </span>
          </div>
          <div slot="content" class="content-slot">
            {#each FORGOT_CONSTANTS.question as stringValue, i}
              <div class="item-flex">
                <span class="item-num">{i+1}</span>
                {stringValue}
              </div>
            {/each}
          </div>
        </Section>
        <Section key="2">
          <div class="d-flex-center" slot="header">
            <img
              class="icon-header"
              alt="Email"
              src="icons/email.png"
              use:lazy={{ src: "icons/email.png" }} />
            <span class="ff-b" bind:this={accordion}>
              Email
            </span>
          </div>
          <div slot="content" class="content-slot">
            {#each FORGOT_CONSTANTS.email as stringValue, i}
              <div class="item-flex">
                <span class="item-num">{i+1}</span>
                {stringValue}
              </div>
            {/each}
          </div>
        </Section>
        <Section key="3">
          <div class="d-flex-center" slot="header">
            <img
              class="icon-header"
              alt="Call Center"
              src="icons/call.png"
              use:lazy={{ src: "icons/call.png" }} />
            <span class="ff-b" bind:this={accordion}>
              Call Center
            </span>
          </div>
          <div slot="content" class="content-slot">
            {#each FORGOT_CONSTANTS.call as stringValue, i}
              <div class="item-flex">
                <span class="item-num">{i+1}</span>
                {stringValue}
              </div>
            {/each}
          </div>
        </Section>
      </Accordion>
    </div>
	</div>
</div>