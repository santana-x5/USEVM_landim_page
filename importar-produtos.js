// importar-produtos.js
// Script de migração: sobe todos os 53 produtos para o Sanity de uma vez.
//
// COMO USAR:
//   1. Instale as dependências: npm install @sanity/client
//   2. Preencha projectId e dataset abaixo (do painel do Sanity)
//   3. Gere um token em: sanity.io → projeto → API → Tokens → Add API token (Editor)
//   4. Execute: node importar-produtos.js

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '4jrhj4c6',   // ← substitua
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skQWdStaWLBtX4fferJt63U4zKzvSlhLHlEMjc9aixHC1StffxY7P9zOHuy3I5u0w59yJ0ec9T2wVdFuVwie2PXv5z7bUykqUBy3PbagXwbynB2a7jnoqmZlcrdiAT7SZwjAazuHwYI7TSxa8CxJNvXRqc57MJQJcKCvu6kjgYQpbqyQJ0Qu',       // ← substitua (token com permissão de escrita)
  useCdn: false
})

// Os 53 produtos extraídos do HTML original
const produtos = [
  { nome: 'Trio de brinco feminino',            preco: 20,  categoria: 'feminino',  imagem: 'assets/images/3bri_fem_20.png' },
  { nome: 'Brinco 10mm',                        preco: 33,  categoria: 'masculino', imagem: 'assets/images/bri_10m_33.png' },
  { nome: 'Brinco 12mm',                        preco: 37,  categoria: 'masculino', imagem: 'assets/images/bri_12m_37.png' },
  { nome: 'Brinco 4mm',                         preco: 15,  categoria: 'masculino', imagem: 'assets/images/bri_4m_15.png' },
  { nome: 'Brinco 5mm',                         preco: 18,  categoria: 'masculino', imagem: 'assets/images/bri_5m_18.png' },
  { nome: 'Brinco 6mm',                         preco: 21,  categoria: 'masculino', imagem: 'assets/images/bri_6m_21.png' },
  { nome: 'Brinco 7mm',                         preco: 24,  categoria: 'masculino', imagem: 'assets/images/bri_7m_24.png' },
  { nome: 'Brinco 9mm',                         preco: 30,  categoria: 'masculino', imagem: 'assets/images/bri_9m_30.png' },
  { nome: 'Brinco baby arco-íris',              preco: 35,  categoria: 'feminino',  imagem: 'assets/images/bri_bb_arcIris_35.png' },
  { nome: 'Brinco baby cristal amarelo',        preco: 30,  categoria: 'feminino',  imagem: 'assets/images/bri_bb_cry_ylw_30.png' },
  { nome: 'Brinco baby rosa G',                 preco: 30,  categoria: 'feminino',  imagem: 'assets/images/bri_bb_pinkG_30.png' },
  { nome: 'Brinco baby rosa M',                 preco: 30,  categoria: 'feminino',  imagem: 'assets/images/bri_bb_pinkM_30.png' },
  { nome: 'Brinco Nossa Senhora cravejado',     preco: 40,  categoria: 'feminino',  imagem: 'assets/images/bri_nss_snr_crav_40.png' },
  { nome: 'Brinco Raio Cravejado',              preco: 75,  categoria: 'masculino', imagem: 'assets/images/bri_raio_75.jpeg' },
  { nome: 'Anel coração vazado cravejado',      preco: 30,  categoria: 'feminino',  imagem: 'assets/images/anel_heart_vaz_crav_30.png' },
  { nome: 'Anel mulher maravilha',              preco: 25,  categoria: 'feminino',  imagem: 'assets/images/anel_mul_mara_25.png' },
  { nome: 'Argola cravejada M',                 preco: 60,  categoria: 'feminino',  imagem: 'assets/images/arg_crav_M_60.png' },
  { nome: 'Argola cravejada P (feminino)',      preco: 55,  categoria: 'feminino',  imagem: 'assets/images/arg_crav_p_55.png' },
  { nome: 'Argola cravejada P (masculino)',     preco: 70,  categoria: 'masculino', imagem: 'assets/images/arg_cra_p_70.png' },
  { nome: 'Argola cravejada PP',                preco: 50,  categoria: 'masculino', imagem: 'assets/images/arg_crav_pp_50.png' },
  { nome: 'Argola inspiração NJR',              preco: 100, categoria: 'masculino', imagem: 'assets/images/argola_njr_100.jpeg' },
  { nome: 'Berloque cacto cristal',             preco: 35,  categoria: 'feminino',  imagem: 'assets/images/berl_cac_crist_35.png' },
  { nome: 'Berloque cacto verde',               preco: 35,  categoria: 'feminino',  imagem: 'assets/images/berl_cac_ver_35.png' },
  { nome: 'Berloque chave cravejado',           preco: 40,  categoria: 'feminino',  imagem: 'assets/images/berl_cha_crav_40.png' },
  { nome: 'Berloque Chapéu gonzaga',            preco: 55,  categoria: 'feminino',  imagem: 'assets/images/berl_cha_gonz_55.png' },
  { nome: 'Berloque Nossa Senhora importado',   preco: 80,  categoria: 'feminino',  imagem: 'assets/images/berl_nss_snr_impo_80.png' },
  { nome: 'Berloque Santinha Cravejado',        preco: 40,  categoria: 'feminino',  imagem: 'assets/images/berl_satinha_crav_40.png' },
  { nome: 'Berloque separador picolé morango',  preco: 55,  categoria: 'feminino',  imagem: 'assets/images/berl_sepa_pic_mora_55.png' },
  { nome: 'Caixa para colar',                   preco: 12,  categoria: 'feminino',  imagem: 'assets/images/cai_col_12.png' },
  { nome: 'Colar elo coração',                  preco: 50,  categoria: 'feminino',  imagem: 'assets/images/col_elo_heart_50.png' },
  { nome: 'Colar Espírito Santo',               preco: 50,  categoria: 'feminino',  imagem: 'assets/images/col_esp_snt_50.png' },
  { nome: 'Colar gota',                         preco: 45,  categoria: 'feminino',  imagem: 'assets/images/col_gota_45.png' },
  { nome: 'Colar Gravatinha',                   preco: 55,  categoria: 'feminino',  imagem: 'assets/images/col_gravinha_55.png' },
  { nome: 'Corrente 1mm 70cm',                  preco: 80,  categoria: 'masculino', imagem: 'assets/images/cor_1m_70c_80.png' },
  { nome: 'Corrente 2mm 70cm',                  preco: 120, categoria: 'masculino', imagem: 'assets/images/cor_2m_70c_120.png' },
  { nome: 'Corrente Veneziana',                 preco: 30,  categoria: 'feminino',  imagem: 'assets/images/cor_ven_30.png' },
  { nome: 'Escapulário 70cm',                   preco: 100, categoria: 'masculino', imagem: 'assets/images/esc_70cm_100.png' },
  { nome: 'Conjunto bolinha Colar + brinco',    preco: 60,  categoria: 'feminino',  imagem: 'assets/images/kit_boli_col_bri_60.png' },
  { nome: 'Conjunto Coração Colar + brinco',    preco: 60,  categoria: 'feminino',  imagem: 'assets/images/kit_col_bri_60.png' },
  { nome: 'Piercing ponto de luz',              preco: 27,  categoria: 'feminino',  imagem: 'assets/images/pie_pnt_luz_27.png' },
  { nome: 'Piercing Trágus (1)',                preco: 30,  categoria: 'feminino',  imagem: 'assets/images/pie_trag_30.png' },
  { nome: 'Piercing Trágus (2)',                preco: 30,  categoria: 'feminino',  imagem: 'assets/images/pie_tragus_30.png' },
  { nome: 'Pingente Cruz cravejado',            preco: 30,  categoria: 'masculino', imagem: 'assets/images/pin_cruz_30.png' },
  { nome: 'Pulseira 3mm elo duplo',             preco: 85,  categoria: 'masculino', imagem: 'assets/images/pul_3m_dou_85.png' },
  { nome: 'Pulseira baby',                      preco: 50,  categoria: 'feminino',  imagem: 'assets/images/pul_baby_50.png' },
  { nome: 'Pulseira Elo coração',               preco: 40,  categoria: 'feminino',  imagem: 'assets/images/pul_elo_heart_40.png' },
  { nome: 'Pulseira coração',                   preco: 50,  categoria: 'feminino',  imagem: 'assets/images/pul_hearts_50.png' },
  { nome: 'Pulseira infinito cravejada',        preco: 45,  categoria: 'feminino',  imagem: 'assets/images/pul_inf_crav_45.png' },
  { nome: 'Pulseira Pandora Coração Cravejado', preco: 200, categoria: 'feminino',  imagem: 'assets/images/pul_pan_heart_cra_200.png' },
  { nome: 'Pulseira Trevo',                     preco: 50,  categoria: 'feminino',  imagem: 'assets/images/pul_trev_50.png' },
  { nome: 'Tornozeleira Bolinha',               preco: 50,  categoria: 'feminino',  imagem: 'assets/images/torno_boli_50.png' },
  { nome: 'Tornozeleira Estilo Chocker',        preco: 75,  categoria: 'feminino',  imagem: 'assets/images/torno_est_choker_75.png' },
  { nome: 'Limpa prata',                        preco: 15,  categoria: 'masculino', imagem: 'assets/images/Limpa_prata_15.jpg' },
]

async function importar() {
  console.log(`Importando ${produtos.length} produtos...`)
  let ok = 0, erro = 0

  for (const p of produtos) {
    try {
      await client.create({
        _type: 'produto',
        nome: p.nome,
        preco: p.preco,
        categoria: p.categoria,
        disponivel: true,
        mensagemWhatsapp: `Olá! Tenho interesse no produto: ${p.nome} (R$ ${p.preco.toFixed(2).replace('.', ',')})`
        // Nota: imagens precisam ser upadas manualmente pelo Sanity Studio
        // ou via upload binário — o caminho local não é acessível pela API
      })
      console.log(`  ✅ ${p.nome}`)
      ok++
    } catch (e) {
      console.error(`  ❌ ${p.nome}: ${e.message}`)
      erro++
    }
  }

  console.log(`\nConcluído: ${ok} importados, ${erro} erros.`)
  console.log('⚠️  Lembre-se de adicionar as fotos manualmente no Sanity Studio.')
}

importar()
