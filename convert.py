
import os

output = "r_vocab.txt"
if os.path.exists(output):
    os.remove(output)


# { "japanese": "こんにちは", "english": "Hello" },

with open(output, "w", encoding="utf-8") as o:
    with open("vocab.txt", "r", encoding="utf-8") as f :
        for line in f.readlines():
            
            if line == "\n":
                continue
            
            # table header
            if line.startswith("Kanji"): 
                continue
            
            # table name 
            if len(line) <=2 :
                continue

            # remove \n
            line = line[:-1] 

            lines = line.split("\t")
            print(lines)

            # two cases with kanji and without
            # end result: { "japanese": "こんにちは", "english": "Hello" },
            if len(lines) > 3:
                new_line = f"{{\"kanji\": \"{lines[0]}\", \"japanese\": \"{lines[1]}\",  \"romaji\": \"{lines[2]}\", \"english\": \"{lines[3]}\"}},\n"
            else:
                new_line = f"{{\"japanese\": \"{lines[0]}\",  \"romaji\": \"{lines[1]}\", \"english\": \"{lines[2]}\"}},\n"          

            o.write(new_line)
            print(new_line)
