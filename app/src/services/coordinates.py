MARGEN_TOLERANCIA = 20

def buscar_letra_por_coordenadas(data_db: list, data_glove: dict) -> str:
    """ Busca la letra más cercana en la base de datos según las coordenadas del guante, y devuelce la letra encontrada. """
    if not data_db:
        return None

    letra_mas_cercana = None
    menor_distancia = float('inf')

    for letra_data in data_db:
        letra = letra_data.get("letter")
        coords_letra = letra_data.get("Coordinates", {})
        distancia_total = 0
        match = True

        for dedo in ["thumb", "index", "middle", "ring", "pinky"]:
            coord_letra = coords_letra.get(dedo)
            coord_guante = data_glove.get(dedo)

            if coord_letra is None or coord_guante is None:
                match = False
                break

            distancia = abs(coord_letra - coord_guante)
            if distancia > MARGEN_TOLERANCIA:
                match = False
                break

            distancia_total += distancia

        # Esta parte debe estar FUERA del for-de-dedo
        if match and distancia_total < menor_distancia:
            menor_distancia = distancia_total
            letra_mas_cercana = letra

    return letra_mas_cercana

def buscar_palabra_por_coordenadas(data_glove: dict) -> str:
    """ Busca la palabra más cercana en la base de datos según las coordenadas del guante, y devuelve la palabra encontrada. """
    if not data_glove:
        return None

    palabra_mas_cercana = None
    menor_distancia = float('inf')

    for palabra_data in data_glove:
        palabra = palabra_data.get("word")
        coords_palabra = palabra_data.get("Coordinates", {})
        distancia_total = 0
        match = True

        for dedo in ["thumb", "index", "middle", "ring", "pinky"]:
            coord_palabra = coords_palabra.get(dedo)
            coord_guante = data_glove.get(dedo)

            if coord_palabra is None or coord_guante is None:
                match = False
                break

            distancia = abs(coord_palabra - coord_guante)
            if distancia > MARGEN_TOLERANCIA:
                match = False
                break

            distancia_total += distancia

        # Esta parte debe estar FUERA del for-de-dedo
        if match and distancia_total < menor_distancia:
            menor_distancia = distancia_total
            palabra_mas_cercana = palabra

    return palabra_mas_cercana
