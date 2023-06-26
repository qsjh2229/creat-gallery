let $container=$('.gallery'),
    $loadMoreBtn=$('.loead-more'),
    $addItemCount=8,         //클릭할 때마다 보여지는 개수
    $added=0,                // 더보기 버튼이 사라지게 하는 용도
    $alldate=[];             // 배열 json파일을 불러와서 넣어놓을 공간




    $.getJSON('./data/content.json', function(data){
        // console.log(data)
        $alldate=data;
        addItem()
        $loadMoreBtn.click(addItem)
    })

    function addItem(){
        let element=[]
        let slicedData;
        
        slicedData=$alldate.slice($added,$added+=$addItemCount)
        console.log(slicedData)

      $.each(slicedData,  function(idx,item){
        let itemHtml=`
    <li class="gallerty-item"><a href="">
    <img src="${item.images.thumb}" alt="${item.title}">
    <figcaption>${item.title}
    </figcaption>
   </a></li> `
   element.push($(itemHtml).get(0))

      })
      
      $container.append(element)


      if( $added< $alldate.length){
        $loadMoreBtn.show()
      }else{
        $loadMoreBtn.hide()
      }
      $container.imagesLoaded( function() {
        $container.masonry('appended',element)

      });
    }
   
    $container.masonry({
        // options
        itemSelector: '.gallerty-item',
        columnWidth: 270,
        gutter:20
      });
      