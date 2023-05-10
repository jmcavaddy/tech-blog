const updatePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      
      const id = event.target.getAttribute('data-id');

      const title = document.querySelector('#title').value.trim();
      const body = document.querySelector('#body').value.trim();
    
      if (title && body) {
        console.log("title: " + title);
        console.log("body: " + body);
        console.log("id: " + id);

        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, body }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
    }
};

const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};




document
    .querySelector('.updatePost-button')
    .addEventListener('click', updatePostHandler);

document
    .querySelector('.deletePost-button')
    .addEventListener('click', deletePostHandler);
