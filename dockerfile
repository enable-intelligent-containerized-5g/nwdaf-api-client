# Node.js image: 20.13.1
FROM node:20.13.1 AS builder

WORKDIR /free5gc

# Clone the repository
RUN git clone --recursive -b v1.0.0 -j `nproc` https://github.com/enable-intelligent-containerized-5g/nwdaf-api-client ./nwdaf-api-client \
    && cd nwdaf-api-client \
    && npm install \
    && npm run build


# Build stage
FROM node:20-alpine
LABEL description="NWDAF-API-CLIENT v1.0.0"
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /free5gc

RUN mkdir dist/

# Copy the dist files
COPY --from=builder /free5gc/nwdaf-api-client/dist  /free5gc/dist/

ENV npm_config_yes=true

RUN npm install -g serve@14.2.4

EXPOSE 3000