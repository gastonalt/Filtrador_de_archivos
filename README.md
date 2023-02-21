# Filtrador de archivos [!watchGit](https://img.shields.io/github/watchers/gastonalt/Filtrador_de_archivos?style=social)

Una app diseñada para seleccionar, filtrar y copiar archivos dado un directorio (con la totalidad de los archivos), un listado de archivos que se deseen filtrar y un directorio de destino (donde se copiarán los archivos filtrados).

## ¿Cómo surgió esta app?

Esta app surgió para resolver el siguiente requerimiento:

**Filtrar N archivos, dado un listado con n nombres de archivos, de un directorio con la totalidad de M archivos** (dónde n=cantidad de archivos a filtrar y m=universo completo de archivos).

**En específico:** trabajé algunos años para un estudio de fotografía y hay un tipo de taréa que particularmente resultaba repetitiva y consumia mucho tiempo. Esta tarea era: seleccionar imágenes para generar un album de fotografías dado la totalidad de archivos del evento en un directorio. Es decir, quizás el álbum de un evento de 2000 fotografías llevaba solo las mejores 120 imágenes del mismo. Para esto los pasos que yo debía seguir eran:

1) Abrir el directorio de todas las 2000 imágenes.
2) Abrir el listado de las 120 fotos seleccionadas para el álbum.
3) Recorrer la lista y buscar en la carpeta de 2000 imágenes para encontrar cada una de las imágenes.
4) Copiar cada una de las imágenes en la carpeta de donde se trabajará luego el album.

Esta tarea consumía mucho tiempo y resultaba tediosa y repetitiva, además de que podían cometerse errores en lo mismo. Este programa busca solventar estos 3 problemas de una forma sencilla, rápida y cómoda.

### Otros contextos donde esta app puede resultar útil

Otros contextos donde puede resultar útil esta app puede ser:
1) La separación de facturas de una empresa.
2) Encontrar n archivos de una base de archivos amplia de m número de archivos.

Y espero (y supongo que otros más). Si quieren aportar con otros contextos no duden en comunicarse conmigo.

## Descarga de la app

El **Filtrador de Archivos** puede descargarse desde el siguiente enlace:

[Filtrador de Archivos V1.0.0.zip](https://drive.google.com/file/d/1OelkCTf4cPFqHglStrV8TJ-irYgLJ9Bb/view?usp=sharing)

## Instalación de la app

### Pasos para la instalación de la app:

1) Descargar la app desde "Descarga de la app".
2) Extraer el archivo descargado con extensión ".zip" en el directorio donde deseemos guardar el programa.
3) En la carpeta extraida buscar el archivo "filtrador-de-archivos.exe" y ejecutarlo.


#### Paso en imágenes

![Archivos del filtrador de imágenes](https://i.ibb.co/W0jK0Js/filtrador-de-archivos-files.png)

#### En caso de que la app no funcione correctamente ejecutar "como Administrador"

## ¿Como funciona?

### Ingresar el listado de archivos a filtrar (1)

Tenemos un campo en primer lugar para ingresar el listado de archivos a filtrar, estos generalmente son valores separados con espacios en el estilo de "XXX_123 XXX-456 XXX7890 etc."

### (Opcional) Ingresar el caractér de separación de los archivos (2)

Podemos especificar con qué caractér se especifica la separación entre las letras y los números del nombre de los archivos. Ejemplo: DSC_1234 el caractér es "_" ya que separa "DSC" de "1234". Por defecto el programa debería de todas formas reconocer este caractér de separación.

### Especificar una carpeta de origen (3)

Debemos especificar la carpeta de origen de los archivos (es decir donde estarán todos los archivos), estos deben estar volcados en un mismo directorio (carpeta) y sin separar en subcarpetas.

### Especificar una carpeta de destino (4)

Debemos especificar una carpeta de destino de los archivos (donde se copiarán los archivos filtrados).

### Click en el botón de comenzar (5)

Clickeamos en el botón de comenzar que, si todos los datos fueron ingresados de manera correcta, debe dejarnos clickear.

#### Pasos en imagen
![Los 5 pasos en imagen con referencia de números](https://i.ibb.co/ctKrCnN/filtrador-de-archivos-step.png)


## ¿Qué atributo/s deben poseer los archivos para funcionar?

Los archivos deben contener una numeración única en su nombre. Esta app está pensada para archivos de imágenes que generalmente se distinguen por su numeración única en su nombre de archivo.

## Capturas de pantalla
![SpashScreen](https://i.ibb.co/QDS6cLb/filtrador-de-archivos-splash.png)

![Ventana Principal](https://i.ibb.co/WpB3rDY/filtrador-de-archivos-main.png)

## Actualizaciones de la app

En estas primeras versiones me comprometo a actualizar la app en caso de que exista algún bug "grande" que no permita el correcto funcionamiento del programa, luego... 

![No cuenten con ello](https://media.tenor.com/TLph8LSsJRQAAAAC/toy-story-eight-ball.gif)

## Conclusiones

Espero que disfruten del programa y sirva para agilizar algún flujo de trabajo que tengan. Muchas gracias por probarlo.
