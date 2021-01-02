
//Inspriational Quotes api

$( document ).ready(function() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://type.fit/api/quotes",
        "method": "GET"
      }
      
      $.ajax(settings).done(function (response) {
        const quotes = JSON.parse(response);
        console.log(quotes);
        // Use a loop to generate X amount of quotes
        for (let i = 0; i < 2; i++) {
            const randomNumber = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomNumber];
            // Create the html for a quote
            const html = $(`<div class="quote">
            <p class="quote_text">"${quote.text}"</p>
            <p class="quote_author">- ${quote.author}</p>
            </div>`)
            // Append this quote to the quotes section 
            $('.quotes').append(html);

        }


      });
})

