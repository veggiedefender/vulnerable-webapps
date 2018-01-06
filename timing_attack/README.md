> Every hacker has her fixation. You hack people, I hack time.
>
> — Whiterose, from [*Mr. Robot*](http://www.imdb.com/title/tt4158110/)

With timing attacks, you can do both! Try to find the password needed to gain access to [SuperChat](http://superchat.jli.host/)
using a timing attack.

Some links to get you started:

* [Side channel attacks (Wikipedia)](https://en.wikipedia.org/wiki/Side-channel_attack)
* [Timing attacks (Wikipedia)](https://en.wikipedia.org/wiki/Timing_attack)
* [A cool read about the new side channel CPU attacks](https://www.raspberrypi.org/blog/why-raspberry-pi-isnt-vulnerable-to-spectre-or-meltdown/)

And lastly, here's [the code](app.py) you should be looking at to figure out how to plan your attack:

-----

If you missed out, you can still play with this project at home. Install [Python 3](https://www.python.org/downloads/) on your
computer (make sure to add it to your path) and follow along:

Install dependencies:

`$ pip install -r requirements.txt`

Create the configuration file:

`$ cp config.py.template config.py`

Open your favorite text editor and edit `config.py`, replacing the password and email.

Start the server:

`$ python wsgi.py`

Then, visit the URL that the command spits out. It'll likely be `http://localhost:5000`

If you want to deploy this on your own server with nginx, follow these 
[steps](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-16-04)
provided by the folks at DigitalOcean.
