$(document).ready(function () {
    $.getJSON("posts/posts.json", function (data) {
        var template = document.getElementById("post-preview-template");

        // Get the contents of the template
        var templateHtml = template.innerHTML;
        // Final HTML variable as empty string
        var listHtml = "";

        for (var key in data.posts) {
            
            var post = data.posts[key];

            listHtml += templateHtml
           .replace(/{{title}}/g, post.title)
           .replace(/{{description}}/g, post.description)
           .replace(/{{datePosted}}/g, moment(post.datePosted).format('Do MMMM YYYY'))
           .replace(/{{file}}/g, post.file);
          }

          document.getElementById("posts-list").innerHTML = listHtml;
    });
});