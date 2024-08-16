import { NextResponse } from 'next/server';

const products = [
  {
    barcode: '4571628861435',
    name: 'Fukagawa Hoppers',
    brewery: 'Hobo Brewing',
    origin: '福岡県',
    style: 'Sour IPA',
    hops: '-',
    ABV: '5.0',
    IBU: '-',
    description:
      '深川・清澄白河のお店、10店舗が集まってつくったオリジナルビールをHobo Brewingで手掛けさせていただきました。\n\n参加店舗はThe Blind Donkey、BEER VISTA BREWERY、かまびす、フダン、winestand TEO、tokyobike、いまでや、BAR NICO、深川蒸溜所、そしてリトルトーキョー。\n\nビールのスタイルはSour IPAです。\nはっきりと輪郭のある酸味をベースに、アメリカンホップを中心としたホップ由来の柑橘やストーンフルーツ、酵母からくるアプリコットのようなキャラクターによるアロマで構成したビールです。今回のビールを作るにあたり、参加店の方々と界隈を実際にホッピングしました。\nそれぞれの飲食店の中はもちろん、この暑い中、日が落ちてから、ホッピングの最中に片手にあっても心地よく飲めるものができたのではないかと思っています。',
    image: 'https://hobobrewing.store/cdn/shop/files/1_540x.jpg?v=1722563148',
  },
  {
    barcode: '4589842377960',
    name: 'UCHU PIE Raspberry&ApplePie',
    brewery: 'うちゅうブルーイング',
    origin: '山梨県',
    style: 'Pastry Sour Ale',
    hops: '-',
    ABV: '6.5',
    IBU: '-',
    description:
      'Pastry Sour Ale新製品 UCHU PIE Raspberry&ApplePieのリリースです！\nラズベリー果汁とりんご果汁の爽やかなアロマに香ばしいフレーバー。口にするとサワーエール由来の甘酸っぱさをお楽しみいただけます！\n\n【コンセプト】\n五次元テンプルにあるパティスリー「アストラル」で人気のパイを、ペイストリーサワーエールで再現しました。\n\n【ブルワーズノート】\nアストラルのパイを再現するためにパンや焼き菓子のような風味の麦芽、そしてりんごとラズベリーを使用して仕上げました。',
    image:
      'https://s3-ap-northeast-1.amazonaws.com/public-my-beer-2/uploads/beer/image/27143/f1e1b090-11b8-4b0a-8c24-2d5f6a92ab9a.jpeg',
  },
  {
    barcode: '4560450663867',
    name: 'Far Yeast Blonde',
    brewery: 'Far Yeast Brewing',
    origin: '山梨県',
    style: 'Golden Ale',
    hops: '-',
    ABV: '5.0',
    IBU: '35',
    description:
      '香り豊かなアロマホップをふんだんに使用した軽快な飲み口のゴールデンエール。',
    image:
      'https://imagedelivery.net/QondspN4HIUvB_R16-ddAQ/561c8e9cbe6be3a6b200fce5/992bca890480aecd5b99.jpg/fit=cover,w=920,h=920',
  },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const barcode = url.searchParams.get('barcode');

  const product = products.find((p) => p.barcode === barcode);

  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}
