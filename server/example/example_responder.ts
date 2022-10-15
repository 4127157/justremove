//use express and just respond to post request that comes from axios from
//another server
//
//
//
//objectcut response obj below - success
//data access in axios = response.data.response.image_base64
/*{
  "correlation_id": "0423985f-c330-4c9d-8e63-1330cd0055c6",
  "error": false,
  "response": {
    "image_base64": "iVBORw0KGgoAAAANSUhEUgAAADEAAAA1CAYAAADoDQMKAAAEwklEQVR4nO2aW2xURRjH/7M7u+u23e1tpVJYYWlLlwqVWjTVakEl1BCITVUaHjAxBBuaaDCBeIEXfcAXE40mGEOiJKaENJBQk5o0PiiSJSmwEuj2Am0UbCttWdIb7fb0zJzxwUvsXto9s1OyMfwfz/m+739+OzPnfDNZIoSASh079pmwXeoADV0znattrcWuQ4c3ZGdn91utdDbZPItpp0XkcrlvYmJMLtnuQF5efsgMALAEEEIYlIXDpvOYYUDPz5fyVA9hCJ1OT5vOY5mZ2Fix6QsZT+UQkdtDq6jFfFnq8UAIYZXxVA6ByUm5mplZ0pZKIe7cGa20TE3JJTszpH2VQhBCOJm+J5VruNzgnDlkcpVCcM4dsq9XkeVCZeVTR2VylUIEgxcP80nzI8EMA8Llgtud/auMr1IIq9U6a0iMhG53ILtwxXVZX6UQQ303XrQZhvmHyMmFz1d0VtZXKYQ2OZEr9Y1wuzE+PlYq66sSghBNIzKJ2o1eDLacrPvyk6Pi6tVf3gFgqg5R1cUahkGPH3pbt//8Y0p1mNcLw1cMrC3Vyss3fl5V9ex7hJAF56gyCMaY8+sD+2dsHReU1ItQG2wbysFW+yByclFbu+PVoqLiM/FiqRJHAP39NxpkP3Tx5GQ6cCUIeiUI5vXih5GR0+0FBWhqOhAz1ZStCc65A0xXVW6e6MAAHN9/B9rdhba21rbo+2obQIUjEU+2jgsgBDHrQ23bEdFUlosRW1+OvDxPKPq6sjUBANCXZjoBAKuoBH9iE6uqqn4/+p5SCDFnamuclLTsXKD6ORRsrAjU1b1WEy9GLYTOlNX653uxZV/TG35/2YmEnkJY1U4nhW8nvqECr797ZHlGRubwQnGEEK50YQumbiQQOI/m5hN9yYQqhbBLNH+J5JgYAx8czNI0LWexWPUHBSoVOI/W1tM/LRaW1hCOiTHc/f3W41ikq01rCACgXZ24fLnjyEIxaQ+h9/YgFLq2f6GYtIdwMh2RPwaXLxSjFGJOYn+djOjN39DT07U30X21h2c0tW8n83rB4vwQfGAAfX29uxPlqZ1O1JZavmcZ2Cu7YkCM8CgIsfBEaUohLCkcCgMAgpcgcnLBdu8B86/DzN8dgM2/Dro+50qUprZ3sqU2EtRiAR8ZgbvUf/3Jl+s/Cl6+eHBsaLAiZ8XK7vr6huqEeSm5RsnqlDoPnifL3TB8vqKzJSX+kyUl/pOLxQshrEr32MSWPMSs0xl3EZPpezAMw8yQCmUQZWXrj/OV3pjrzOv9a2MTJerxgO+oiy1ksp0nhBjKICilEawt1aIfmD1TA+uaNTHxLByGUVAAbWvtvBExlj0CzpnTlLfkM8dVY+NbD31jt4/OhTofJpoGvtoHkZEh2GofoVeC82KFzkApndm6r2lPe77nDLo6ITKzwIuKUVPzQpMZX2UngP/V8PDtpw2D2wsLV54DgO7uzjcDH3/4Fe3t+TeGrynGo3sbW7Zt294AgLS3t7XMzkY8O3fWb7NYLKbm1JJAxNOpU9+GplqaH8OtW+C5+RAvbcf+gx9IHUBH675BAEAgcO7TqXB4ld3lHt+8+fkms/8cSKT7CrFUSvtWPBk9gEgXPYBIFz2ASBf9LyD+BObSsMudEZ01AAAAAElFTkSuQmCC"
  }
}*/

//a4a response obj below - success
//data access in axios = response.data.results[0].entities.image
/*{
  "results": [
    {
      "status": {
        "code": "ok",
        "message": "Success"
      },
      "name": "img.jpg",
      "md5": "f2d13d0242b98aae82bc7a6dc76e1ea9",
      "entities": [
        {
          "kind": "image",
          "name": "general-fg-image",
          "image": "iVBORw0KGgoAAAANSUhEUgAAADEAAAA1CAYAAADoDQMKAAAEwklEQVR4nO2aW2xURRjH/7M7u+u23e1tpVJYYWlLlwqVWjTVakEl1BCITVUaHjAxBBuaaDCBeIEXfcAXE40mGEOiJKaENJBQk5o0PiiSJSmwEuj2Am0UbCttWdIb7fb0zJzxwUvsXto9s1OyMfwfz/m+739+OzPnfDNZIoSASh079pmwXeoADV0znattrcWuQ4c3ZGdn91utdDbZPItpp0XkcrlvYmJMLtnuQF5efsgMALAEEEIYlIXDpvOYYUDPz5fyVA9hCJ1OT5vOY5mZ2Fix6QsZT+UQkdtDq6jFfFnq8UAIYZXxVA6ByUm5mplZ0pZKIe7cGa20TE3JJTszpH2VQhBCOJm+J5VruNzgnDlkcpVCcM4dsq9XkeVCZeVTR2VylUIEgxcP80nzI8EMA8Llgtud/auMr1IIq9U6a0iMhG53ILtwxXVZX6UQQ303XrQZhvmHyMmFz1d0VtZXKYQ2OZEr9Y1wuzE+PlYq66sSghBNIzKJ2o1eDLacrPvyk6Pi6tVf3gFgqg5R1cUahkGPH3pbt//8Y0p1mNcLw1cMrC3Vyss3fl5V9ex7hJAF56gyCMaY8+sD+2dsHReU1ItQG2wbysFW+yByclFbu+PVoqLiM/FiqRJHAP39NxpkP3Tx5GQ6cCUIeiUI5vXih5GR0+0FBWhqOhAz1ZStCc65A0xXVW6e6MAAHN9/B9rdhba21rbo+2obQIUjEU+2jgsgBDHrQ23bEdFUlosRW1+OvDxPKPq6sjUBANCXZjoBAKuoBH9iE6uqqn4/+p5SCDFnamuclLTsXKD6ORRsrAjU1b1WEy9GLYTOlNX653uxZV/TG35/2YmEnkJY1U4nhW8nvqECr797ZHlGRubwQnGEEK50YQumbiQQOI/m5hN9yYQqhbBLNH+J5JgYAx8czNI0LWexWPUHBSoVOI/W1tM/LRaW1hCOiTHc/f3W41ikq01rCACgXZ24fLnjyEIxaQ+h9/YgFLq2f6GYtIdwMh2RPwaXLxSjFGJOYn+djOjN39DT07U30X21h2c0tW8n83rB4vwQfGAAfX29uxPlqZ1O1JZavmcZ2Cu7YkCM8CgIsfBEaUohLCkcCgMAgpcgcnLBdu8B86/DzN8dgM2/Dro+50qUprZ3sqU2EtRiAR8ZgbvUf/3Jl+s/Cl6+eHBsaLAiZ8XK7vr6huqEeSm5RsnqlDoPnifL3TB8vqKzJSX+kyUl/pOLxQshrEr32MSWPMSs0xl3EZPpezAMw8yQCmUQZWXrj/OV3pjrzOv9a2MTJerxgO+oiy1ksp0nhBjKICilEawt1aIfmD1TA+uaNTHxLByGUVAAbWvtvBExlj0CzpnTlLfkM8dVY+NbD31jt4/OhTofJpoGvtoHkZEh2GofoVeC82KFzkApndm6r2lPe77nDLo6ITKzwIuKUVPzQpMZX2UngP/V8PDtpw2D2wsLV54DgO7uzjcDH3/4Fe3t+TeGrynGo3sbW7Zt294AgLS3t7XMzkY8O3fWb7NYLKbm1JJAxNOpU9+GplqaH8OtW+C5+RAvbcf+gx9IHUBH675BAEAgcO7TqXB4ld3lHt+8+fkms/8cSKT7CrFUSvtWPBk9gEgXPYBIFz2ASBf9LyD+BObSsMudEZ01AAAAAElFTkSuQmCC"
        }
      ]
    }
  ]
}*/
