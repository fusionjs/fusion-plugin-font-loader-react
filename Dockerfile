FROM node:8.9.4@sha256:4c43091f426f1a630c3db3acb6f2eaf940e50eafe4d08ddc53f4d5832ba9958d

WORKDIR /fusion-plugin-font-loader-react

# Install electron dependencies.
ENV DISPLAY :99
ADD .buildkite/xvfb_init /etc/init.d/xvfb
ADD .buildkite/xvfb_daemon_run /usr/bin/xvfb-daemon-run

RUN dpkg --add-architecture i386
RUN apt-get update
RUN apt-get -y install libgtk2.0-dev libx11-xcb-dev libgtkextra-dev libgconf2-dev libnss3 libasound2 libxtst-dev libxss1 xvfb && \
	chmod a+x /etc/init.d/xvfb /usr/bin/xvfb-daemon-run

COPY . .

RUN yarn

RUN yarn build-test
