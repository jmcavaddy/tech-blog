const commentFormHandler = async (event) => {
    event.preventDefault();
    const post_id = document.querySelector('.viewPost-post').getAttribute('data-id');
    console.log(post_id);
    const body = document.querySelector('#new-comment-body').value.trim();

  
    if ( body && post_id ) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ body, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
};


document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);