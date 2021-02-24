<script>
  import Meta from "@components/meta/index.svelte";
  import InputOTP from "./_components/otp.svelte";

  let otp;
  let error;
</script>

<Meta title="Test input OTP" />
<div class="wrapper-clean">
  <div class="form-wrap">
    <InputOTP bind:otp autoSubmit={() => alert("submitted")} {error} />
  </div>
</div>
