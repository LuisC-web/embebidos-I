# Recordar que:
#         k(y)      =  ( k )
#                   ( ky )
#         k(x)      =  ( k )
#                   ( kx )

# (x0, y0) + (i )    (x1 )
#               *   (y1 )
#             ( x1 - x0 )
#             ( y1 - y0 )

import array
from machine import mem32, uctypes
# Puntos de ejemplos
Punto1 = array.array('l', [0,1])
Punto2 = array.array('l', [0,2])
Punto3 = array.array('l', [0,1])
Punto4 = array.array('l', [0,2])
dir_P0 = uctypeaddressof(Punto1)
dir_P1 = uctypeaddressof(Punto2)
dir_P2 = uctypeaddressof(Punto3)
dir_P3 = uctypeaddressof(Punto4)
lista = [uctypeaddressof(array.array('l', []))]
# Valores por defecto
i = 0
n = 4
# función cálculo de puntos de bezier recibe direcciones y n
def calcular_puntos(dir_p0, dir_p1, dir_p2, dir_p3, n):
    # calculamos cada t
    t = i / (n+1)
    t1 = (1 - t)
    t2 = (1 - t) * (1 - t)
    t3 = t**3
    lista_salida = array.array('l', [])
    if (t ==0):
        i = 0
        return lista_salida
    else:
        lista_array[mem32(uctypes.addressof(lista_salida) + 4 * i)] = [
            [t1 * Punto1[mem32(dir_P1)], t1 * Punto1[mem32(dir_P1) + 4 * i]],
            [t2 * Punto2[mem32(dir_P2)], t2 * Punto2[mem32(dir_P2) + 4 * i]],
            [t3 * Punto3[mem32(dir_P3)], t3 * Punto3[mem32(dir_P3) + 4 * i]],
            [t4 * Punto4[mem32(dir_P4)], t4 * Punto4[mem32(dir_P4) + 4 * i]]
        ]
        i += 1
        return calcular_puntos(dir_p0, dir_p1, dir_p2, dir_p3, n)

# calcular_puntos(dir_P0, dir_P1, dir_P2, dir_P3, n)

lista_final = calcular_puntos(dir_P0, dir_P1, dir_P2, dir_P3, n)
dir_lista_final = uctypes.addressof(lista_final)
for i in range(len(lista_final)):
    print(i + " " + lista_final[i] * mem32(dir_lista_final + 4 * i))
