#! /bin/bash

curl "https://pocketbase.douglasmoura.dev/api/collections/posts/records?perPage=200&expand=tags,featuredImage" -o posts.json

