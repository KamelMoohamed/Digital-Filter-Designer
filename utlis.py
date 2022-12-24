import numpy as np
import scipy

def parseToComplex(x_y_form):
    complex_form= [0]*len(x_y_form)
    for i in range(len(x_y_form)):
        complex_form[i] = x_y_form[i]["x"]+ x_y_form[i]["y"]*1j
    return complex_form

def filterResponse(zeros, poles):
    frequencies_values, response_complex = scipy.signal.freqz_zpk(zeros, poles, 1)
    normalized_frequency=frequencies_values/max(frequencies_values)
    magnitude_response = 20 * np.log10(np.abs(response_complex))
    phase_response = np.unwrap(np.angle(response_complex))
    return normalized_frequency, np.around(magnitude_response, decimals=3), np.around(phase_response, decimals=3)

def differenceEqCoef(zeros,poles):
    num_coef, den_coef = scipy.signal.zpk2tf(zeros, poles, 1)
    return  num_coef, den_coef 