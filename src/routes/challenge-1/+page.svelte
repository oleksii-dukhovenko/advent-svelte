<script>
	import { onMount } from 'svelte';
	import { fly , fade } from 'svelte/transition';
	import CustomButton from '$lib/components/CustomButton.svelte';
  
	/**
	 * @type {any[]}
	 */
	let children = [];
	/**
	 * @type {string | any[]}
	 */
	let filteredChildren = []; 
	let showButton = true; 
  
	onMount(async () => {
	  const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
	  children = await response.json();
	});
  
	function handleClick() {
	  showButton = false; 
	  if (children.some(child => child.tally < 50)) {
		filteredChildren = children.filter(child => child.tally < 50);
	  }
	}
  </script>


<main>
<div class="center">
  <h1 class="text-3xl font-bold underline" style="margin-top: 150px; text-align: center; margin-bottom: 100px;">
	Challenge 1 - Solution
  </h1>
</div>

<div class="center">
	<div class="picture-div">
	  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTzHsOUm7wLLQ6lkNOU7lWWkqSNtd4X6pUZH3UN6z04RKmXl0YTh9kQ0GmCpc9Xo2_ehE&usqp=CAU" alt="Santa Picture" style="border-radius: 20%; margin-top: 80px">
	</div>
</div>

<div class="center">
<h3 class="text-3xl font-bold underline center" style="margin-top: 50px;">
Below is a list of all children on 'Santa's list'.
</h3>
</div>

<style>
  .center {
	display: grid;
	place-items: center;
	height: 20vh;
  }
</style>

<div class="center" in:fade>
    <ul>
      {#each children.slice(0, 10) as child}
        <li in:fly={{ x: 200, delay: 100 }}>{child.name} : {child.tally}</li>
      {/each}
      {#if children.length > 10}
	  <li in:fly={{ x: 200, delay: 700 }}>...and so on</li>
      {/if}
    </ul>
  </div>

  {#if filteredChildren.length > 0}
    <div class="center" style="margin-top: 50px;">
      <h3 class="text-red-600 text-3xl font-bold underline center ">Naughty List!</h3>
      <div in:fade={{ duration: 300 }}>
        <ul>
          {#each filteredChildren as child}
            <li in:fly={{ x: -200, delay: 100 }}>{child.name} : {child.tally}</li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  {#if showButton}
    <div class="center" style="margin-top: 50px;" out:fade={{ duration: 300 }}>
      <CustomButton on:click={handleClick} />
    </div>
  {/if}
</main>