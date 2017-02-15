# Export your google maps :star: (favorites, a.k.a. bookmarks) to the kml file.

## Step 1. Install prerequisites.
### 1.1 Install nodejs [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
### 1.2 Clone repository.
### 1.3 ``cd`` to clonned repository.
### 1.4 Run ``npm install``

## Step 2. Download html file with bookmarks from google maps.
### 1.1 Go to Google Bookmarks: [https://www.google.com/bookmarks/](https://www.google.com/bookmarks/).
### 1.2 On the bottom left, click "Export bookmarks".
### 1.3 Save the GoogleBookmarks.html file to the project folder.

## Step 3. Run script.
### 3.1 Run ``npm install``
### 3.1 Find GoogleBookmarks.kml in the project folder.

# Attention. How it works and why you should not fully rely on this script.
Algorythm is following:

1. Script opens the links provided in the GoogleBookmarks.html using the Chrome user agent:
``Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36``.
2. Script search for the ``<meta>`` tag with content like ``<meta content="https://maps.google.com/maps/api/staticmap?sensor=false&amp;center=35.65858048019947%2C139.7432442152582&amp;zoom=16&amp;size=256x256&amp;language=en&amp;markers=35.6585805%2C139.7454329&amp;client=google-maps-frontend&amp;signature=EkdXkpjZDhS6mphd4u-riHzWCds" itemprop="image" property="og:image">``
3. Script tries to extract the "markers" value, in case if it is missed, script tries to extract the values from "center" (probably it will work for the cases when the expoting values is not a poit, but kind of a square with multiple poins). 
4. Script uses extracted values to populate the kml. Extracted values could be not preceise, since the way we are getting it is rather tricky.

