import random, string

def generate_pnr():
    return "PNR-" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
import random, string

def generate_pnr():
    return "PNR-" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
