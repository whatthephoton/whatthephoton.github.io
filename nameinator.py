# requires Python 3
# make a copy of names_list and remove names from that?

# shuffle names after every time?

from random import shuffle


def choose_names(names_list):
    '''Return to_remove, a list of names you want to remove from
    names_list. Precondition: names_list has at least two items.'''
    to_remove = []
    for i in range(len(names_list)//2):
        print(names_list[2 * i], names_list[2 * i + 1])
        choice = input("Type 1 if you prefer the first name, and 2 if you prefer the second name. Type 3 if you like both, and 0 if you dislike both.")
        if choice == '1':
            # keep first, remove second
            to_remove.append(names_list[2 * i + 1])
            print(to_remove)
        elif choice == '2':
            # keep second, remove first
            to_remove.append(names_list[2 * i])
            print(to_remove)
        elif choice == '0':
            # remove both
            to_remove.append(names_list[2 * i])
            to_remove.append(names_list[2 * i + 1])
            print(to_remove)
    return to_remove

# remove all the names you've collected

def remove_names(names_list, to_remove):
    '''Remove all names from names_list that are in to_remove,
    in-place.'''
    print("Removing names...")
    for name in to_remove:
        names_list.remove(name)
    print("Finished removing names.")

# code to run actual program

print("Opening name file, please wait...")

# open file here, read into a list names_list
file = open('nameslist.txt', 'r')
names_list = file.readlines()
file.close()

print("Finished opening files.")

# keep going till you only have one name in the list
while len(names_list) > 1:
    to_remove = choose_names(names_list)
    remove_names(names_list, to_remove)
    shuffle(names_list)
    print("Your current list is ", names_list)

# length of names_list nust be 1; only one name left in list
print("Finished, the name you've kept is ", names_list)

    
    
