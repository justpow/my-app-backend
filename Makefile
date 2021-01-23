#!/bin/bash

export NOW=$(shell date +"%Y/%m/%d")

init:
	@echo "${NOW} == Run docker"
	docker-compose -f etc/file/docker-compose.yaml down

	@echo "${NOW} == Try running postgres database.."
	docker-compose -f etc/file/docker-compose.yaml up -d	
	@echo "${NOW} == Successfully run postgres database"

	@echo "${NOW} == Exporting database to postgres container.."
	docker exec -i db_app psql -U postgres postgres < etc/file/postgres.sql
	@echo "${NOW} == Successfully export database to postgres container.."

	@echo "${NOW} == Installing dependencies"
	yarn
	@echo "${NOW} == Initialization is finished. Ready to run"

.PHONY: dev
dev:
	@echo "${NOW} == Run docker"
	docker-compose -f etc/file/docker-compose.yaml down

	@echo "${NOW} == Try running postgres database.."
	docker-compose -f etc/file/docker-compose.yaml up -d	
	@echo "${NOW} == Successfully run postgres database"
	
	yarn start:watch
