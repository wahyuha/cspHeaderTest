<style>
	.btn-close {
    width: 24px;
    height: 24px;
    background: none;
  }
  .btn-close:before, .btn-close:after {
    position: absolute;
    margin-top: -12px;
    content: ' ';
    height: 24px;
    width: 2px;
    background-color: #001122;
  }
  .btn-close:before {
    transform: rotate(45deg);
  }
  .btn-close:after {
    transform: rotate(-45deg);
  }
</style>

<button class="btn-close" />