# GITHUB CHEATSHEET

[Documentacion de github](https://docs.github.com/en)

## Inicializacion de git

```bash
git init
git config --global user.name "florespon" #--global si quiero que la configuración sea para todos los repos de la pc.
git config --global user.email "juan27fp@gmial.com"
git remote add origin URL #con url del repo en github
```

## Pushear modificaciones

```bash
git add . #Working copy
git commit -m "mensaje" #Staging
git push origin main #envía los cambios al repo remoto . master o main. depende de la fecha. origin es el remoto.
git status

```

## Clonar y actualizar desde un repo remoto

```bash
git clone URL #para bajar por primera vez un repo remoto y tenerlo local.
git pull #"origin main" si tengo más de un repo remoto o mas de una branch #para actualizar el repo local con los datos nuevos presentes en el repor remoto. 'master' para previos al 10/2020, main para posteriores.
```

## Cambio de master a main

```bash
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
```

## Borrar una branch si estoy dentro de ella.

```bash
git checkout master #tengo que salir de esa branch
#git branch -d master #-d: --delete
git branch -D master #-D: --delete --force
```

## Subir estructuras de carpetas vacías de repo local a remoto

```bash
touch directorio/.gitkeep
```

## Eliminar un commit local que no querés que quede en el log ni en el repo

```bash
git reset --hard HEAD~1 #--hard para no guardar los cambios que quedaron en el commit, --soft para guardarlos.
```
