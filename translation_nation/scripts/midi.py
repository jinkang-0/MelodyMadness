import mido
from collections import defaultdict
from pydub import AudioSegment
from pydub.generators import Sine

# helper functions for export_midi()
def note_to_freq(note, concert_A=440.0):
    '''
    from wikipedia: http://en.wikipedia.org/wiki/MIDI_Tuning_Standard#Frequency_values
    '''
    return (2.0 ** ((note - 69) / 12.0)) * concert_A

def ticks_to_ms(ticks, tempo):
    tick_ms = (60000.0 / tempo) / mid.ticks_per_beat
    return ticks * tick_ms


# @source https://gist.github.com/jiaaro/339df443b005e12d6c2a
# exports a MIDI object into a specified path (with specified tempo)
def export_midi(mid, tempo, outputPath):
    output = AudioSegment.silent(mid.length * 1000.0)

    for track in mid.tracks:
        # position of rendering in ms
        current_pos = 0.0

        current_notes = defaultdict(dict)

        for msg in track:
            current_pos += ticks_to_ms(msg.time, tempo)

            if msg.type == 'note_on':
                current_notes[msg.channel][msg.note] = (current_pos, msg)

            if msg.type == 'note_off':
                start_pos, start_msg = current_notes[msg.channel].pop(msg.note)

                duration = current_pos - start_pos

                signal_generator = Sine(note_to_freq(msg.note))
                rendered = signal_generator.to_audio_segment(
                    duration=duration-50, volume=-20).fade_out(100).fade_in(30)

                output = output.overlay(rendered, start_pos)

    output.export(outputPath, format="wav")

# @source Chat GPT
# ticks_per_beat = number
# pitch_duration_pairs = list of (pitch, duration) pairs
def generate_midi(ticks_per_beat, pitch_duration_pairs, instrument):
    mid = mido.MidiFile(ticks_per_beat=ticks_per_beat)
    track = mido.MidiTrack()
    mid.tracks.append(track)

    # specify instrument
    program_change = mido.Message('program_change', program=instrument, time=0)
    track.append(program_change)

    # create note on and note off messages for each note
    for pitch, duration in pitch_duration_pairs:
        tick_duration = int(ticks_per_beat * duration)
        note_on = mido.Message('note_on', note=pitch, velocity=64, time=0)
        note_off = mido.Message('note_off', note=pitch, velocity=64, time=tick_duration)
        track.append(note_on)
        track.append(note_off)

    return mid


# example usage
ticks_per_beat = 480
melody = [
    (60, 1), # C4 (middle C), quarter note
    (62, 1), # D4, quarter note
    (64, 1), # E4, quarter note
    (65, 1), # F4, quarter note
    (67, 1), # G4, quarter note
    (69, 1), # A4, quarter note
    (71, 1), # B4, quarter note
    (72, 2), # C5 (1 octave above middle C), half note
    (71, 1), # B4, quarter note
    (69, 1), # A4, quarter note
    (67, 1), # G4, quarter note
    (65, 1), # F4, quarter note
    (64, 1), # E4, quarter note
    (62, 1), # D4, quarter note
    (60, 2), # C4, half note
    (72, 1), # C5, quarter note
    (74, 1), # D5, quarter note
    (76, 1), # E5, quarter note
    (77, 1), # F5, quarter note
    (79, 1)  # G5, quarter note
]
tempo = 100  # bpm

# this makes a small melody using instrument 0 - Acoustic Grand Piano
mid = generate_midi(ticks_per_beat, melody, 0)

# this outputs the MIDI object into "output.wav"
export_midi(mid, tempo, 'output.wav')
