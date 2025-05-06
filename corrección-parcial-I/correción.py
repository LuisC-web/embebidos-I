import array
from machine import mem32
import uctypes

# Puntos de entrada como arrays de 2 enteros: [x, y]
Punto1 = array.array('l', [0, 1])
Punto2 = array.array('l', [0, 2])
Punto3 = array.array('l', [0, 1])
Punto4 = array.array('l', [0, 2])

# Direcciones
dir_P0 = uctypes.addressof(Punto1)
dir_P1 = uctypes.addressof(Punto2)
dir_P2 = uctypes.addressof(Punto3)
dir_P3 = uctypes.addressof(Punto4)

# Array de salida (2 * (n+1) posiciones: x, y por punto)
n = 4
lista_salida = array.array('l', [0] * ((n + 1) * 2))

def calcular_puntos_recursivo(i, n, dir_p0, dir_p1, dir_p2, dir_p3, salida):
    if i > n:
        return salida

    t = i / n
    u = 1 - t

    x0 = mem32[dir_p0]
    y0 = mem32[dir_p0 + 4]
    x1 = mem32[dir_p1]
    y1 = mem32[dir_p1 + 4]
    x2 = mem32[dir_p2]
    y2 = mem32[dir_p2 + 4]
    x3 = mem32[dir_p3]
    y3 = mem32[dir_p3 + 4]

    x = int(u**3 * x0 + 3 * u**2 * t * x1 + 3 * u * t**2 * x2 + t**3 * x3)
    y = int(u**3 * y0 + 3 * u**2 * t * y1 + 3 * u * t**2 * y2 + t**3 * y3)

    salida[i * 2] = x
    salida[i * 2 + 1] = y

    return calcular_puntos_recursivo(i + 1, n, dir_p0, dir_p1, dir_p2, dir_p3, salida)

# Ejecutar recursivamente desde i=0
lista_final = calcular_puntos_recursivo(0, n, dir_P0, dir_P1, dir_P2, dir_P3, lista_salida)

# Mostrar resultados
for i in range(n + 1):
    x = lista_final[i * 2]
    y = lista_final[i * 2 + 1]
    print(f"{i}: ({x}, {y})")
