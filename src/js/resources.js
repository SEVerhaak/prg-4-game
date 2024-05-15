import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Food: new ImageSource('images/fish_oil_sardine_crop.png'),
    Tuna: new ImageSource('images/fish_albacore_tuna_cropped.png'),
    BlackSnapper: new ImageSource('images/fish_black_snapper_cropped.png'),
    MuttonSnapper: new ImageSource('images/fish_mutton_snapper_cropped.png'),
    OilSardine: new ImageSource('images/fish_oil_sardine_crop.png'),
    RedSnapper: new ImageSource('images/fish_red_snapper_cropped.png'),
    Sardine: new ImageSource('images/fish_sardine_cropped.png'),
    Mackeral: new ImageSource('images/fish_spanish_mackeral_cropped.png'),
    YellowTailSnapper: new ImageSource('images/fish_yellow_tail_snapper_cropped.png'),
    YellowTang: new ImageSource('images/fish_yellow_tang_cropped.png')

}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Food,
    Resources.Tuna,
    Resources.BlackSnapper,
    Resources.MuttonSnapper,
    Resources.OilSardine,
    Resources.RedSnapper,
    Resources.Sardine,
    Resources.Mackeral,
    Resources.YellowTailSnapper,
    Resources.YellowTang
])

export { Resources, ResourceLoader }