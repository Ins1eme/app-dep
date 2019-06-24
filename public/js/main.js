$(document).ready(function() {
    
    const params = {
        limit: 10,
        offset: 10,
    }

    let isLoad = true
    let scroll = true

    $('.nav__item--sub').click(function(event) {
        $(this)
            .find('.arrow-img')
            .toggleClass('rotate')
        $(this)
            .next()
            .slideToggle(500)
    })

    $(window).scroll(_ => {
        if ( $(window).scrollTop() >= $(document).height() - $(window).height() - 10 ) {
            if(scroll) {
                loadNews()
            }
            scroll = false
        }
    })

    function loadNews() {
        if (isLoad) {
            $.post('/news', params, function(data) {
                if(!data) {
                    return isLoad = false
                }
                
                params.offset += params.limit

                data.forEach(news => {
                    $('.news-wrap').append(`
                        <div class="news"> 
                            <div class="news-title title"> 
                                <h2 class="title__text">${news.title}</h2>
                            </div>
                            <div class="news-main"> 
                                <div class="news-photo"> 
                                    <img src="../${news.imgUrl}" alt="news-photo" />
                                </div>
                                <div class="news-info"> 
                                    <p class="news-text">${news.info.slice(0, 200) + '...'}</p>
                                    <a href= '/news/${news.title}' class="btn main-btn">Детальніше</a>
                                </div>
                            </div>
                        </div>
                    `)
                })

                scroll = true
            })
        } else {
            return false
        }
    }
})
