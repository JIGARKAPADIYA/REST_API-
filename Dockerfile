FROM node:14.17
WORKDIR /API
COPY . /API
RUN npm i 
CMD ["npm","start"]