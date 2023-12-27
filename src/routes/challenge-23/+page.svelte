<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchElfPosts } from './ElfNetService';
  import type { ElfPost, Comment } from './types';

  let posts: ElfPost[] = [];

  onMount(async () => {
    posts = await fetchElfPosts();
  });

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: '2-digit',
      minute: '2-digit'
    });
  };
</script>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .post {
    background: #f8f8f8;
    border: 1px solid #b41919;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 15px;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .post-author {
    font-weight: bold;
    font-size: 1.2rem;
    color: #1877F2;
  }

  .post-content {
    margin-bottom: 10px;
  }


  .comments {
    margin-top: 20px;
    padding-left: 20px;
  }

  .comment {
    border-bottom: 1px solid #d1c6c6;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .comment-author {
    font-weight: normal;
    color: #0eabb6;
  }
  .comment-timestamp {
    font-size: 0.8rem;
    margin-bottom: 5px;
  }
  .h1 {
    color: #1877F2;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 50px;
  }
  .f-logo {
    position: fixed;
    top: 50px;
    left: 80px; 
    z-index: 9999;
    font-family: 'Arial', sans-serif;
    font-size: 180px;
    font-weight: bold;
    color: #1877F2;
    border-width: 3px;
    border-style: solid;
    border-color: #1877F2;
    padding: 40px;
  }
</style>

<main>
  <h1 class ="h1">Elf-Book</h1>
  <div class="f-logo">f</div>
  {#each posts as post}
    <div class="post">
      <div class="post-header">
        <span class="post-author">{post.author}</span>
        <span class="post-timestamp">{formatDate(post.timestamp)}</span>
      </div>
      <div class="post-content">{post.content}</div>
     <div class="comments">
       {#if (post.comments.length === 0)}
         No comments yet.
       {:else}
         <strong>Comments:</strong>
         {#each post.comments as comment}
           <div class="comment">
             <div class="comment-author">{comment.author}</div>
             <div class="comment-timestamp">{formatDate(comment.timestamp)}</div>
             <div class="comment-content">{comment.content}</div>
           </div>
         {/each}
       {/if}
     </div>
    </div>
  {/each}
</main>
