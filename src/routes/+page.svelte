<script>
  import { onMount } from "svelte";
  import { Container } from "sveltestrap";

  let loadingSymbols = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇"];
  let currentSymbolIndex = 0;

  function animateLoading() {
    currentSymbolIndex = (currentSymbolIndex + 1) % loadingSymbols.length;
  }

  onMount(() => {
    const interval = setInterval(animateLoading, 100); // Adjust the interval time as needed
    return () => clearInterval(interval);
  });
</script>

<Container>
  <!-- Centered Content -->
  <div class="centered-content">
    <!-- Main Content -->
    <div class="logo">
      EBRAI⠯
    </div>

    <!-- Loading Animation -->
    <div class="loading-animation">
      {loadingSymbols[currentSymbolIndex]}
    </div>
    <div>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum[d] exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</div>
  </div>
</Container>

<style>
  /* Add your styles here */
  * {
    /* outline: 1px solid red; */
  }

  .centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* width: 100%;
    height: 50vh; */
  }

  .logo {
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 40px 0;
  }

  .loading-animation {
    font-size: 24px;
    padding-top: 20px;
  }

  /* Additional styles for responsive design */
  @media (max-width: 768px) {
    .centered-content {
      padding: 20px;
    }
  }
</style>
