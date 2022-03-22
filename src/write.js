const $goBack = document.querySelector('.go-back');
const $titleInput = document.querySelector('.title-input');
const $contentInput = document.querySelector('.content-input');
const $titleLength = document.querySelector('.current-title-length');
const $publishButton = document.querySelector('.publish-button');
const $postForm = document.querySelector('.post-form');

function checkInputLength({target}) {
    if (target.value && target.value.length > 30) {
        alert('30자를 초과한 제목을 입력할 수 없습니다.');
        return
    }
    $titleLength.innerText = target.value.length;
}

async function postSubmit(event) {
    // 폼 제출 시 새로고침되는 디폴트 효과 제거
    event.preventDefault()

    await fetch(`http://localhost:1234/posts`, {
        method: 'POST',
        // axios 형식이 아니라 json으로 넣어준다고 header에 명시
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            title: $titleInput.value,
            content: $contentInput.value,
        })
    })
}

$titleInput.addEventListener('input', checkInputLength)
// 발행 버튼을 누르면 postForm 의 submit event 발행
$postForm.addEventListener('submit', postSubmit);
$publishButton.addEventListener('click', () => {
    // despatchEvent : 편리하게 이벤트 발행 가능
    $postForm.dispatchEvent(new Event('submit'));
})

$goBack.addEventListener('click', () => {
    // 한 단계만 뒤로가기
    window.history.back(1);
})