<?php
/**
 * @package WordPress
 * @subpackage <%= themeName %>
 * @since <%= themeName %> 1.0
 */
 get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			
		<article class="post" id="post-<?php the_ID(); ?>">

			<h2><?php the_title(); ?></h2>

			<?php posted_on(); ?>

			<div class="entry">

				<?php the_content(); ?>

				<?php wp_link_pages(array('before' => __('Pages: ','<%= themeNameSpace %>'), 'next_or_number' => 'number')); ?>

			</div>

			<?php edit_post_link(__('Edit this entry','<%= themeNameSpace %>'), '<p>', '</p>'); ?>

		</article>
		
		<?php comments_template(); ?>

		<?php endwhile; endif; ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
