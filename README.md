# CAT-PHOTO-ELBUM
[![T](https://asset.programmers.co.kr/image/origin/production/skill_check_assignment/119211/ae62b4c1-2fff-465a-81c7-1c4ba4a5288c.png)](https://school.programmers.co.kr/skill_check_assignments/100)
프로그래머스 과제테스트 연습 [고양이 사진첩 애플리케이션](https://school.programmers.co.kr/skill_check_assignments/100)
을 구현한 웹사이트



---

### Review
* CSS 선택자 를 매개변수로 자신을 포함해 부모 요소로 순회하면서 가장 가까운 요소 반환

[closest](https://developer.mozilla.org/ko/docs/Web/API/Element/closest)
```javascript
    this.$Nodes.addEventListener('click', (e) => {
      const node = e.target.closest('.Node');
      if (node) {
        const id = node.dataset.id;
        if (id) {
          const selectedNode = this.state.currentNodes.find(
            (node) => node.id === id
          );
          onClickNode(selectedNode);
        } else onClickPrev();
      }
    });
    
    ...
    
    this.$Nodes.innerHTML = `...
          <div class='Node' data-id=${node.id}>
            <img src="./src/assets/directory.png" />
            <div>${node.name}</div>
          </div>
          `
```
이벤트 위임을 활용할 때, class="Node" 요소의 자식요소들인 img 나 div 태그를 클릭하면 e.target 에 해당요소들이 할당된다. <br/>
closest(CSS선택자) 메소드를 통해 해당요소의 부모요소인 Node를 받아올 수 있다. 
<br/>
<br/>

* html 요소에 data-* 특성(attribute)을 지정하여 DOM 속성(property) dataset 을 통해 접근 

[data-*](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/data-*)
```javascript
  this.$Nodes.addEventListener('click', (e) => {
      const node = e.target.closest('.Node');
      if (node) {
        const id = node.dataset.id;
        
        ...
        
    this.$Nodes.innerHTML = `...
          <div class='Node' data-id=${node.id}>
          
          ...

```
class='Node'인 요소에 data-id 를 지정하여 DOM 객체 node의 프로퍼티 dataset으로 접근하여 활용
<br/>
<br/>
* img 태그 src 에서 이미지 불러오기 오류 발생시 처리

[onerror](https://developer.mozilla.org/ko/docs/Web/HTML/Element/img#%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC_%EA%B0%80%EC%A0%B8%EC%98%AC_%EC%88%98_%EC%97%86%EC%9D%84_%EB%95%8C)
```

     ...

     this.$Imageview.innerHTML = `
            <div class='Modal'>
                <div>
                    <img src='https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public${
                      this.state
                    }' onerror="alert('프로그래머스 서버 오류로 이미지를 받아오는데 실패했습니다'); this.parentElement.parentElement.remove(); ${this.onClose()} " />
                </div>
            </div>
        `;
```
onerror 을 통해 class='Modal' 요소를 제거 
<br/>
<br/>
.이미지 소스를 받아올 수 없을때 onerror 이벤트를 활용한 처리방법

1. 대체 이미지
```javascript
<img src='https://...wrong_link' onerror="this.src='./asset/example.png' />
```
2. 요소 제거 or 숨기기
```javascript
<img src='https://...wrong_link' onerror="this.remove();" />  or  <img src='https://...wrong_link' onerror="this.style.display='none';" />
```
3. 함수
```javascript
function handleError() {...}
<img src='https://...wrong_link' onerror="handleError();" />
```

