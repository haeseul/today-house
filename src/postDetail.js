const $detailContainer = document.querySelector('.content-container')
const $coverImage = document.querySelector('.cover-image')
const $postContent = document.querySelector('.post-content')

const postDetailTemplate = `  <div class="category">온라인 집들이</div>
<div class="title">200개의 식물과 사는, 가드너의 빈티지 무드 하우스</div>

<div class="profile">
  <div class="profile-image-container">
    <img
      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/163797496600670255.jpeg?gif=1&w=144&h=144&c=c"
      alt="프로필 이미지"
      class="profile-image"
    />
  </div>
  <div class="profile-detail">
    <span class="profile-detail-nickname">sophiegamgak</span>
    <span class="profile-detail-date">2021년 11월 27일</span>
  </div>
</div>`;

// url 속에서 포스트 id 추출
const postId = new URLSearchParams(window.location.search).get('id');

// 각 postId에 맞는 게시글 추출
async function fetchPost(postId) {
    const response = await fetch(`http://localhost:1234/posts/${postId}`);
    const data = await response.json();

    return data;
}

// 단일 호출, 단일 응답
fetchPost(postId).then((post) => {
  $coverImage.src = post.image
  $postContent.innerText = post.content
  $detailContainer.innerHTML = `  <div class="category">온라인 집들이</div>
    <div class="title">${post.title}</div>
    
    <div class="profile">
      <div class="profile-image-container">
        <img
          src="${post.authorImage}"
          alt="프로필 이미지"
          class="profile-image"
        />
      </div>
      <div class="profile-detail">
        <span class="profile-detail-nickname">${post.author}</span>
        <span class="profile-detail-date">2021년 11월 27일</span>
      </div>
    </div>`
});