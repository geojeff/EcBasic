EcBasic ("E-commerce Basic") started from github.com/alexpercsi/ecommerce, which included comments about suggested
changes. The original ecommerce SproutCore app was done by Alex Percsi and a colleague (github.com/razvan-jurca/eCommerce)
as part of a training exercise. I read the comments and made quite a few suggested changes, and also moved code out of
controllers and into the models, added a statechart, more controllers, etc. This repo does not show history changes from
the original, because it was developed in a private repo for a while and then dumped out before a final round of changes
were made as a separate app. You may wish to look at the version in github.com/alexpercsi/ecommerce for comments (will
need to translate from Romanian, if you don't speak that language).

I presently don't need to develop this app further, but perhaps we can fix/move it along, if only as another simple example
SproutCore app. Or somebody may need to develop it for a real web storefront.

This app has been developed with SproutCore stable-1.4 and with the Ki statechart framework. You'll need to add Ki to
your frameworks directory, and depending on your local dev environment, perhaps SproutCore also.

The default loading sets the store from fixtures data, and the app loads with several categories, each with several
products. Products can be double-clicked, and then added to a shopping cart. The shopping cart can be viewed and edited.
Checkout prints to the console the url that would be fired to PayPal, as an example.

If you comment out the categories and products in the fixtures files for the records, you can simulate an admin workflow,
whereby a site owner would add categories and products from scratch (labeled "COLD_START" in the statechart). This is
stopping at a bug involving creation of the first category and subsequent attempts to set the first product into the
first category.
