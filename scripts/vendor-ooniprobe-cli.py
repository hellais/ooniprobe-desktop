import os
from glob import glob
import sys
import shutil

OONIPROBE_DESKTOP_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    '..'
))

OONIPROBE_CLI_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    '..',
    '..',
    'ooniprobe-cli'
))

# Vendorize the config related files from ooniprobe-cli
def main():
    if not os.path.isdir(OONIPROBE_CLI_ROOT):
        print('error: ooniprobe-cli must exist in ' + OONIPROBE_CLI_ROOT)
        sys.exit(1)

    ignore_files = ['ipc.js', 'geoip.js']
    for path in glob(os.path.join(OONIPROBE_CLI_ROOT, 'src', 'config', '*')):
        config_root = os.path.join(OONIPROBE_DESKTOP_ROOT, 'main', 'config')
        filename = os.path.basename(path)
        if filename in ignore_files:
            continue
        dst_path = os.path.join(config_root, filename)
        with open(path) as in_file:
            with open(dst_path, 'w+') as out_file:
                out_file.write('// Autogenerated code. Do not edit\n')
                shutil.copyfileobj(in_file, out_file)

if __name__ == '__main__':
    main()
