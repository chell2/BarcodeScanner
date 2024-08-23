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
    image: '/fukagawa.png',
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
    image: '/uchupie.png',
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
      '香り豊かなアロマホップをふんだんに使用した軽快な飲み口のゴールデンエール。\n［受賞歴］Korea International Beer Award 2024 American-Style Pale Ale 部門 銀賞 / JAPAN BREWERS CUP 2024 小麦ビール部門 4位 / ASIA BEER AWARDS 2024 Golden Ale部門 金賞',
    image: '/faryeast.png',
  },
  {
    barcode: '4582651541188',
    name: 'The Gateway',
    brewery: 'WEST COAST BREWING',
    origin: '静岡県',
    style: 'Imperial Stout \nw/Coconut Flakes and Bananan',
    hops: '-',
    ABV: '14.0',
    IBU: '-',
    description:
      '新たな若い力であるThe Collectiveの活躍により、用宗のHop Dudeたちは連戦連勝し意気揚々としていたが、Alchemistだけは何故か拭い去れない、なんとも言えない不安を感じていた。\n\nそんな中、Nemesisの目撃情報を得た彼は、ダークサイドとの決着をつけるべく、盟友であるProdigyと共に禁断の地「Forbidden Land」に足を踏み入れていた。そこで彼らが見たものは、最後の仕事を終えたNemesisの姿だった。\n\n突如あたり一面は闇に包まれ、禍々しい巨大なゲートが現れた。大きな音を立てながらその門は開き、遂にこの世と深淵の闇をつなぐ門は開かれた！\n\nチョコレートやバナナ、ココナッツの甘ーい香り。アロマ同様のフレーバーには、ドライフルーツやコーヒーの風味もほんのり。まろやかで厚みのある口当たりから、甘みと僅かな苦みが口の中に広がっていく。\n\n無数の終わりの始まり、闇の巨人ホップブレイカー。我が祖母の命を奪ったこのダークサイドの力で、この穢れた世界を無“MU”に返すのだ。',
    image: '/wcb.png',
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
