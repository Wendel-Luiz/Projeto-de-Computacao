try:
    import sim
    import requests
    import keyboard
except:
    print ('--------------------------------------------------------------')
    print ('"sim.py" could not be imported. This means very probably that')
    print ('either "sim.py" or the remoteApi library could not be found.')
    print ('Make sure both are in the same folder as this file,')
    print ('or appropriately adjust the file "sim.py"')
    print ('--------------------------------------------------------------')
    print ('')

import time

dispCode = '5f8de563b8e8d80af02a02ee'
url = 'http://localhost:3000/disp/'

print ('Program started')
print ('Press "Esc" to exit')
sim.simxFinish(-1) # just in case, close all opened connections
clientID=sim.simxStart('127.0.0.1',19999,True,True,5000,5) # Connect to CoppeliaSim
conectado = sim.simxGetConnectionId(clientID)

if (conectado != -1):
    print ('Connected to remote API server')

    time.sleep(0.02)
    sim.simxGetStringSignal(clientID, 'leitura', sim.simx_opmode_streaming)
    sim.simxGetStringSignal(clientID, 'flag', sim.simx_opmode_streaming)
    time.sleep(0.02)

    flagAntiga = 1
    sair = False

    while(conectado is not -1 and not sair):
        errorLeitura, sinalLeitura = sim.simxGetStringSignal(clientID, 'leitura', sim.simx_opmode_buffer)
        errorFlag, sinalFlag = sim.simxGetStringSignal(clientID, 'flag', sim.simx_opmode_buffer)

        leitura = sinalLeitura.decode('utf-8')
        flagNova = sinalFlag.decode('utf-8')

        if(flagNova != flagAntiga):
            flagAntiga = flagNova
            dado = int(leitura)
            payload = {'pulsos': dado}
            r = requests.post(url + dispCode, json=payload)
            print(dado)

        time.sleep(0.05)
        sair = keyboard.is_pressed('esc')
        conectado = sim.simxGetConnectionId(clientID)

    if(conectado != -1):
        print('Saindo')
        sim.simxGetPingTime(clientID)
        sim.simxFinish(clientID)
else:
    print ('Failed connecting to remote API server')
print ('Program ended')
